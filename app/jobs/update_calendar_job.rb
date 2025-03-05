class UpdateCalendarJob < ApplicationJob
  limits_concurrency to: 2, key: ->(calendar) { calendar.user }, duration: 5.minutes
  queue_as :default

  discard_on ActiveRecord::RecordNotFound

  # workaround for dynamic scheduled jobs - each job will schedule the next job
  # see https://github.com/rails/solid_queue/issues/186 for more info about this
  # solid queue does not currenly support dynamically scheduling tasks
  #
  # the job runs every 12 hours
  # per user there can only be 2 jobs running concurrently
  # if the job attempts to use a calendar which has been deleted it fails and is discarded
  def perform(calendar)
    calendar.fetch_and_generate_ics(nil)

    self.class.set(wait: 12.hours).perform_later(calendar)
  end
end
