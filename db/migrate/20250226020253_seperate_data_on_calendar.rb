class SeperateDataOnCalendar < ActiveRecord::Migration[8.0]
  def change
    remove_column :calendars, :data
    add_column :calendars, :upcoming_events, :jsonb
    add_column :calendars, :completed_events, :jsonb
  end
end
