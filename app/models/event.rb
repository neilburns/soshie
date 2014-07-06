
class Event < ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord
  # validates :title, presence: true
  # validates :location, presence: true
  # validates :description, presence: true
  # validates :imgurl, presence: true
  # validates :datetime, presence: true
  # attr_accessible :venue, :latitude, :longitude
  geocoded_by :address
  after_validation :geocode
end