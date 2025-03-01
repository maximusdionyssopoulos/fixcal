class CalendarsController < ApplicationController
  before_action :require_google_oauth_user!
  before_action :set_calendar, only: %i[ show edit update destroy ]

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

  # GET /calendars/1/edit
  def edit
    render inertia: "Calendar/Edit", props: {
      calendar: serialize_calendar(@calendar)
    }
  end

  # POST /calendars
  def create
    @calendar = current_user.calendars.new(calendar_params)
    @calendar.public_id = Nanoid.generate(size: 15)

    if @calendar.save
      @calendar.fetch_and_generate_ics(params[:url])

      redirect_to @calendar, notice: "Calendar was successfully created."
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
        @calendar.fetch_and_generate_ics(calendar_params[:url])
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
