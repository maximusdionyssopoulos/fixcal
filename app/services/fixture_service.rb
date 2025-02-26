class FixtureService
  include HTTParty

  def fetch_data(url)
    html_response = self.class.get(url)

    api_url = extract_url_from_html(html_response.body)

    return nil unless api_url

    json_response = self.class.get(api_url)
    # Rails.logger.debug json_response.pretty_inspect

    data = JSON.parse(json_response.body)

    {
      completed_matches: data["MobTeamDetails"]["CompletedMatchCollection"],
      upcoming_matches: data["MobTeamDetails"]["UpcomingMatchCollection"]
    }
  end

  private
  def extract_url_from_html(html)
    doc = Nokogiri::HTML(html)
    script_content = doc.css('script[type="text/javascript"]').text

    match = script_content.match(/var url = "(?<base_url>[^"]+)" \+ (?<centre_id>\d+) \+ "&teamId=" \+ (?<team_id>\d+)/)
      return unless match

      "#{match[:base_url]}#{match[:centre_id]}&teamId=#{match[:team_id]}"
  end
end
