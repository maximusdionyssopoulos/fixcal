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
      event.dtstart = parse_match_datetime(match["MatchDate"], match["MatchTime"], match["CompetitionName"])
      calendar.add_event(event)
    end

    @upcoming_match_data.each do |match|
      event = Icalendar::Event.new
      event.summary = "#{match["HomeTeam"]["Name"]} - #{match["AwayTeam"]["Name"]}"
      event.location = match["CourtName"]
      event.description = "#{match["CompetitionName"]} - Round #{match["Round"]}"
      event.dtstart = parse_match_datetime(match["MatchDate"], match["MatchTime"], match["CompetitionName"])
      calendar.add_event(event)
    end

    calendar.to_ical
  end

  private
  def parse_match_datetime(date_str, time_str, competition_name)
    years = parse_year(competition_name)

    parsed_date = Date.parse(date_str)
    wkday = parsed_date.wday
    day = parsed_date.day
    month = parsed_date.month

    year = years.find do |year|
      Date.new(year.to_i, month, day).wday == wkday
    end

    datetime_str = "#{date_str}, #{year} #{time_str}"

    DateTime.parse(datetime_str)
  end

  def parse_year(competition_name)
    years = []
    pattern = /\b((?:19|20)\d{2})(?:\/(\d{2}))?\b/

    matches = competition_name.scan(pattern)
    matches.each do |match|
      full_year, abbreviated_year = match

      if full_year && full_year.length == 4 && full_year.match?(/^\d+$/)
        years << full_year
      end

      if abbreviated_year
        century = full_year[0, 2]
        full_second_year = century + abbreviated_year

        if full_second_year.length == 4 && full_second_year.match?(/^\d+$/)
          years << full_second_year
        end
      end
    end

    years
  end
end
