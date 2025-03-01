class Calendar < ApplicationRecord
  belongs_to :user
  has_one_attached :ics_file

  validates :url, presence: true

  def to_param
    public_id
  end

  def fetch_and_generate_ics(url)
    fixture_service = FixtureService.new
    if url.present?
      data = fixture_service.fetch_and_extract_data(url)
      self.store_api_url!(data)
    elsif self.fetch_url.present?
      data = fixture_service.fetch_data(self.fetch_url)
    else
      data = fixture_service.fetch_and_extract_data(self.url)
      self.store_api_url!(data)
    end

    calendar_data = IcsService.new(data[:completed_matches], data[:upcoming_matches]).generate

    self.upcoming_events = data[:upcoming_matches]
    self.completed_events = data[:completed_matches]

    self.ics_file.attach(
          io: StringIO.new(calendar_data),
          filename: "calendar_#{self.public_id}.ics",
          content_type: "text/calendar"
        )
    self.save
  end

  private
    # store the scrapped url for quicker updating & remove it from hash so its not redudantly stored
    def store_api_url!(data)
      self.fetch_url = data[:api_url]
      data.delete(:api_url)
    end
end
