class RootController < ApplicationController
  def index
    render inertia: "Root"
  end

  def download
    # TODO: handle errors better
    fixture_service = FixtureService.new

    data = fixture_service.fetch_data(params[:url])
    calendar_data = IcsService.new(data[:completed_matches], data[:upcoming_matches]).generate
    send_data calendar_data,
                type: "text/calendar",
                disposition: "attachment",
                filename: "fixtures.ics"
  end
end
