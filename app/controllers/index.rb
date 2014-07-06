get '/' do
  @events = Event.all
  # latitude = params[:latitude].to_f
  # longitude = params[:longitude].to_f
  # p longitude
  # p latitude
  # @events = Event.near([latitude, longitude], 10)
  # @events = Event.near([37.7843511, -122.3972421], 10)
  erb :index
end

post '/new_event' do
  Event.create({:title => params[:title], :description => params[:description],
                :location => params[:location], :imgurl => params[:imgurl]})
  redirect '/'
end