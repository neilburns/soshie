get '/' do
  @events = Event.all.reverse #.order('something')
  erb :index
end

post '/new_event' do
  Event.create({:title => params[:title], :description => params[:description],
                :location => params[:location], :imgurl => params[:imgurl]})
  redirect '/'
end