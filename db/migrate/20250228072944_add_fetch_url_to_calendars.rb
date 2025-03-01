class AddFetchUrlToCalendars < ActiveRecord::Migration[8.0]
  def change
    add_column :calendars, :fetch_url, :string
  end
end
