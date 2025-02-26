class RootController < ApplicationController
  def index
    render inertia: "Root"
  end

  def download
    if params[:url].blank?
        return render json: { error: "URL parameter is required" }, status: :bad_request
    end
    unless params[:url].start_with?("https://sportfix.net/app/teamdetails?")
      return render json: { error: "Invalid SportFix URL" }, status: :bad_request
    end
    fixture_service = FixtureService.new

    data = fixture_service.fetch_data(params[:url])
    unless data
        return render json: { error: "No fixture data found for this URL" }, status: :not_found
    end

    calendar_data = IcsService.new(data[:completed_matches], data[:upcoming_matches]).generate
    send_data calendar_data,
                type: "text/calendar",
                disposition: "attachment",
                filename: "fixtures.ics"
  end
end
