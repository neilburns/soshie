get '/' do
  erb :event_feed
end

get '/nearby' do
  latitude = params[:latitude].to_f
  longitude = params[:longitude].to_f
  Event.near([latitude, longitude], 50).to_json
end

post '/create_event' do
  Event.create({:title => params[:title], :description => params[:description],
                :location => params[:location], :imgurl => params[:imgurl]})
  redirect '/'
end