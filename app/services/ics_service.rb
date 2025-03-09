class IcsService
  def initialize(completed_match_data, upcoming_match_data, name)
    @completed_match_data = completed_match_data
    @upcoming_match_data = upcoming_match_data
    @name = name
    # get the first match -assumes data is in order
    @start_date = completed_match_data.to_a.empty? ?
                  upcoming_match_data.to_a.first["MatchDate"] :
                  completed_match_data.to_a.first["MatchDate"]
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
    current_year = Time.now.year
    match_month = Date.parse(date_str).month
    current_month = Time.now.month
    start_date = Date.parse(@start_date).month

    # Case 1: start_date <= match_month && current_month < match_month
    # We are checking if when we are creating the calendar we are in the new year but the
    # match was last year. If the start is greater than the match we know the match is in the new year
    # Example: Creating calendar in January (current_month=1)
    #          Season starts in August (start_date=8)
    #          Processing a November match (match_month=11)
    # Result: This match belongs to the previous year (current_year-1)
    #
    # Case 2: start_date < match_month && current_month <= match_month
    # We are checking if the match is taking place when the calendar in being created
    # Example: Creating calendar in November (current_month=11)
    #          Season starts in August (start_date=8)
    #          Processing a November match (match_month=11)
    # Result: This match belongs to the current year
    #
    # Case 3: start_date < match_month && current_month > match_month
    # We are checking if the match is taking place next year
    # Example: Creating calendar in January (current_month=1)
    #          Season starts in August (start_date=8)
    #          Processing a May match (match_month=5)
    # Result: This match belongs to the next year (current_year+1)
    #
    #
    # this assumes the fixtures are not a year long
    # i.e. no fixture goes from December to December
    year_to_use = if start_date <= match_month && current_month < match_month
      current_year - 1
    elsif start_date < match_month && current_month <= match_month
      current_year
    elsif start_date < match_month && current_month > match_month
      current_year + 1
    else
      current_year
    end

    datetime_str = "#{date_str}, #{year_to_use} #{time_str}"

    DateTime.parse(datetime_str)
  end
end
