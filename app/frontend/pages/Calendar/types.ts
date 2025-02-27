export interface CalendarType {
  url: string;
  upcoming_events: [Event];
  completed_events: [Event];
  public_id: string;
}

export interface Event {
  AwayTeam: {
    Name: string;
  };
  AwayTeamScore?: string;
  CompetitionName: string;
  CourtName: string;
  MatchDate: string;
  MatchTime: string;
  Round: string;
  HomeTeam: {
    Name: string;
  };
  HomeTeamScore?: string;
  ResultSubmitted: boolean;
}

// export type CalendarFormType = Omit<CalendarType, "id">;
