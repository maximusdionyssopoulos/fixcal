class IcsService
  def initialize(completed_match_data, upcoming_match_data, name)
    @completed_match_data = completed_match_data
    @upcoming_match_data = upcoming_match_data
    @name = name
  end

  # iterate over all completed & upcoming data and return a ical/ics string format
  def generate
    calendar = Icalendar::Calendar.new
    calendar.x_wr_calname = @name
    @completed_match_data.each do |match|
      event = Icalendar::Event.new
      event.summary = "#{match["HomeTeam"]["Name"]} - #{match["AwayTeam"]["Name"]} (#{match["HomeTeamScore"]} - #{match["AwayTeamScore"]})"
      event.location = match["CourtName"]
      event.description = "#{match["CompetitionName"]} - Round #{match["Round"]}"
      event.dtstart = parse_match_datetime(match["MatchDate"], match["MatchTime"])
      calendar.add_event(event)
    end

    @upcoming_match_data.each do |match|
      event = Icalendar::Event.new
      event.summary = "#{match["HomeTeam"]["Name"]} - #{match["AwayTeam"]["Name"]}"
      event.location = match["CourtName"]
      event.description = "#{match["CompetitionName"]} - Round #{match["Round"]}"
      event.dtstart = parse_match_datetime(match["MatchDate"], match["MatchTime"])
      calendar.add_event(event)
    end

    calendar.to_ical
  end

  private
  def parse_match_datetime(date_str, time_str)
    # Current year is needed since it's missing from the date string
    current_year = Time.now.year

    # Handle potential year rollover (if date is in past months but should be next year)
    match_month = Date.parse(date_str).month
    current_month = Time.now.month
    year_to_use = if match_month < current_month && match_month < 3
                    current_year + 1
    else
                    current_year
    end

    datetime_str = "#{date_str}, #{year_to_use} #{time_str}"

    # Parse the combined string
    DateTime.parse(datetime_str)
  end
end
