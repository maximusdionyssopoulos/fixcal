class AddNameToCalendar < ActiveRecord::Migration[8.0]
  def change
    add_column :calendars, :name, :string
  end
end
