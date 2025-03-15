class AddPublicOptionToCalendar < ActiveRecord::Migration[8.0]
  def change
    add_column :calendars, :public, :boolean, default: false
  end
end
