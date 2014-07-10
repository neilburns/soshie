get '/' do
  erb :event_feed
end

get '/nearby' do
  latitude = params[:latitude].to_f
  longitude = params[:longitude].to_f
  Event.near([latitude, longitude], 10).to_json
end

post '/create' do
  p "creating event..."
  new_event = Event.create({:title => params[:title], :description => params[:description],
                            :address => params[:address], :venue => params[:venue],
                            :datetime => params[:datetime]})
  new_event.timezone = NearestTimeZone.to(new_event.latitude, new_event.longitude)
  redirect '/'
end