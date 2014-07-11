
class Event < ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :venue, presence: true
  validates :address, presence: true
  validates :datetime, presence: true
  # validates :imgurl, presence: true
  geocoded_by :address
  after_validation :geocode
end