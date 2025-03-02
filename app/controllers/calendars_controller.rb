class CalendarsController < ApplicationController
  before_action :require_google_oauth_user!, except: [ :show ]
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
    respond_to do |format|
      format.html do
        return redirect_to auth_path unless user_signed_in?
        authorize @calendar
        render inertia: "Calendar/Show", props: {
        calendar: serialize_calendar(@calendar)
      }
      end
      format.ics { send_data @calendar.ics_file.download,
        type: "text/calendar",
        disposition: "attachment",
        filename: "#{@calendar.public_id}-fixtures.ics" }
    end
  end

  # GET /calendars/1/edit
  def edit
    authorize @calendar
    render inertia: "Calendar/Edit", props: {
      calendar: serialize_calendar(@calendar)
    }
  end

  # POST /calendars
  def create
    @calendar = current_user.calendars.new(calendar_params)
    @calendar.public_id = Nanoid.generate(size: 15)

    authorize @calendar

    if @calendar.save
      @calendar.fetch_and_generate_ics(params[:url])
      # after we have created the calendar we need to enqueue the first job to refresh the data
      # each subsequent job will enqueue the next job
      UpdateCalendarJob.set(wait: 12.hours).perform_later(@calendar)
      # UpdateCalendarJob.set(wait: 1.minutes).perform_later(@calendar)

      redirect_to @calendar, notice: "Calendar was successfully created."
    else
      redirect_to "/", inertia: { errors: @calendar.errors }
    end
  end

  # PATCH/PUT /calendars/1
  def update
    authorize @calendar
    url = @calendar.url
    if @calendar.update(calendar_params)
      # don't re-generate if the urls are the same
      unless url.eql? @calendar.url
        # we do not need to manage any jobs here - the job will use the fetch_url from the calendar model
        @calendar.fetch_and_generate_ics(calendar_params[:url])
      end
      redirect_to @calendar, notice: "Calendar was successfully updated."
    else
      redirect_to edit_calendar_url(@calendar), inertia: { errors: @calendar.errors }
    end
  end

  # DELETE /calendars/1
  def destroy
    authorize @calendar
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
