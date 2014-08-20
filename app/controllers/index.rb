get '/' do
  erb :index
end

get '/nearby' do
  # For the sake of demonstration, I am returning all events to the
  # AJAX call, instead of actual local events - which theoretically, users
  # would submit themselves.. To actually pull local events, return the
  # local_events variable instead of the seeded_events variable.
  local_events = Event.near([params[:latitude].to_f, params[:longitude].to_f], 50).to_json
  seeded_vents = Event.all.to_json
  return seeded_vents
end

post '/create' do
  new_event = Event.create(params)
  new_event.datetime = DateTime.iso8601(params[:datetime])
  redirect '/'
end