get '/' do
  erb :index
end

get '/nearby' do
  Event.near([params[:latitude].to_f,
              params[:longitude].to_f], 50).to_json # responding to ajax request
end

post '/create' do
  new_event = Event.create(params)
  new_event.datetime = DateTime.iso8601(params[:datetime])
  redirect '/'
end