class CalendarsController < ApplicationController
  before_action :require_google_oauth_user!
  before_action :set_calendar, only: %i[ show edit update destroy ]

  # inertia_share flash: -> { flash.to_hash }

  # GET /calendars
  def index
    @calendars = Calendar.all
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
    @calendar = Calendar.new(calendar_params)

    if @calendar.save
      redirect_to @calendar, notice: "Calendar was successfully created."
    else
      redirect_to new_calendar_url, inertia: { errors: @calendar.errors }
    end
  end

  # PATCH/PUT /calendars/1
  def update
    if @calendar.update(calendar_params)
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
      @calendar = Calendar.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def calendar_params
      params.require(:calendar).permit(:url, :data, :public_id, :user_id)
    end

    def serialize_calendar(calendar)
      calendar.as_json(only: [
        :id, :url, :data, :public_id, :user_id
      ])
    end
end
