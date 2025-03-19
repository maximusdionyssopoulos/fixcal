class AddArchiveOptionToCalendar < ActiveRecord::Migration[8.0]
  def change
    add_column :calendars, :archive, :boolean, default: false
  end
end
