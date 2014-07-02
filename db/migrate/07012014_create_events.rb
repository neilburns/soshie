class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title, :location, :date, :time
      t.text :description, :imgurl
    end
  end
end