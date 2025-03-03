class FixtureService
  include HTTParty

  # fetch from the user provided url and extract the actual url with the json payload we want
  # this is stored within the javascript of the html returned by the first
  # we return the api_url along with the upcoming & completed data so we can store this for future use
  # this will speed up future jobs to update this data
  def fetch_and_extract_data(url)
    html_response = self.class.get(url)

    doc = Nokogiri::HTML(html_response.body)
    script_content = doc.css('script[type="text/javascript"]').text

    match = script_content.match(/var url = "(?<base_url>[^"]+)" \+ (?<centre_id>\d+) \+ "&teamId=" \+ (?<team_id>\d+)/)
    return nil unless match

    api_url = "#{match[:base_url]}#{match[:centre_id]}&teamId=#{match[:team_id]}"

    return nil unless api_url
    data = fetch_data(api_url)

    return nil unless data

    {
      api_url: api_url,
      completed_matches: data[:completed_matches],
      upcoming_matches: data[:upcoming_matches],
      name: data[:name]
    }
  end

  # fetch the data and extract the "MobTeamDetails" from the json response
  def fetch_data(url)
    json_response = self.class.get(url)

    data = JSON.parse(json_response.body)
    return nil unless data["MobTeamDetails"]

    {
      name: data["MobTeamDetails"]["Name"],
      completed_matches: data["MobTeamDetails"]["CompletedMatchCollection"],
      upcoming_matches: data["MobTeamDetails"]["UpcomingMatchCollection"]
    }
  end
end
