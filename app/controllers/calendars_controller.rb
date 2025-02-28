class CalendarsController < ApplicationController
  before_action :require_google_oauth_user!
  before_action :set_calendar, only: %i[ show edit update destroy ]

  # inertia_share flash: -> { flash.to_hash }

  # GET /calendars
  def index
    @calendars = current_user.calendars.all
    render inertia: "Calendar/Index", props: {
      calendars: @calendars.map do |calendar|
        serialize_calendar(calendar)
      end
    }
  end

  # GET /calendars/1
  def show
    render inertia: "Calendar/Show", props: {
      calendar: serialize_calendar(@calendar)
    }
  end

  # GET /calendars/new
  # def new
  #   @calendar = Calendar.new
  #   render inertia: 'Calendar/New', props: {
  #     calendar: serialize_calendar(@calendar)
  #   }
  # end

  # GET /calendars/1/edit
  def edit
    render inertia: "Calendar/Edit", props: {
      calendar: serialize_calendar(@calendar)
    }
  end

  # POST /calendars
  def create
    # @calendar = current_user.calendars.new(
    #   url: params[:url],
    #   upcoming_events: data[:upcoming_matches],
    #   completed_events: data[:completed_matches],
    #   public_id: Nanoid.generate(size: 15)
    # )
    @calendar = current_user.calendars.new(calendar_params)
    @calendar.public_id = Nanoid.generate(size: 15)

    if @calendar.save
      fixture_service = FixtureService.new

      data = fixture_service.fetch_data(params[:url])
      calendar_data = IcsService.new(data[:completed_matches], data[:upcoming_matches]).generate

      @calendar.upcoming_events = data[:upcoming_matches]
      @calendar.completed_events = data[:completed_matches]

      @calendar.ics_file.attach(
            io: StringIO.new(calendar_data),
            filename: "calendar_#{@calendar.public_id}.ics",
            content_type: "text/calendar"
          )
      @calendar.save
      redirect_to calendar_path(@calendar)
    else
      redirect_to "/", inertia: { errors: @calendar.errors }
    end
  end

  # PATCH/PUT /calendars/1
  def update
    url = @calendar.url
    if @calendar.update(calendar_params)
      # don't re-generate if the urls are the same
      unless url.eql? @calendar.url
        fixture_service = FixtureService.new

        data = fixture_service.fetch_data(calendar_params[:url])
        calendar_data = IcsService.new(data[:completed_matches], data[:upcoming_matches]).generate

        @calendar.upcoming_events = data[:upcoming_matches]
        @calendar.completed_events = data[:completed_matches]

        @calendar.ics_file.attach(
              io: StringIO.new(calendar_data),
              filename: "calendar_#{@calendar.public_id}.ics",
              content_type: "text/calendar"
            )
        @calendar.save
      end
      redirect_to @calendar, notice: "Calendar was successfully updated."
    else
      redirect_to edit_calendar_url(@calendar), inertia: { errors: @calendar.errors }
    end
  end

  # DELETE /calendars/1
  def destroy
    @calendar.destroy!
    redirect_to calendars_url, notice: "Calendar was successfully destroyed."
  end

  private
  def require_google_oauth_user!
    # Only redirect if user is not yet signed in
    redirect_to auth_path unless user_signed_in?
  end

    # Use callbacks to share common setup or constraints between actions.
    def set_calendar
      @calendar = Calendar.find_by(public_id: params[:public_id])
    end

    # Only allow a list of trusted parameters through.
    def calendar_params
      params.expect(calendar: [ :url ])
    end

    def serialize_calendar(calendar)
      calendar.as_json(only: [
        :url, :upcoming_events, :completed_events, :public_id
      ])
    end
end
