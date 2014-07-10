class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title, :venue, :address, :datetime, :timezone
      t.text :description, :imgurl
      t.float :latitude, :longitude
    end
  end
end