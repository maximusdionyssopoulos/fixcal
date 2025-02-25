class CreateCalendars < ActiveRecord::Migration[8.0]
  def change
    create_table :calendars do |t|
      t.string :url
      t.json :data
      t.string :public_id
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
