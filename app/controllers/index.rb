get '/' do
  erb :index
end

get '/location' do
  latitude = params[:latitude].to_f
  longitude = params[:longitude].to_f
  Event.near([latitude, longitude], 10).to_json
end

post '/new_event' do
  Event.create({:title => params[:title], :description => params[:description],
                :location => params[:location], :imgurl => params[:imgurl]})
  redirect '/'
end