# Eventable Code Challenge
## Chris Wilkening

[Deployed app](https://obscure-scrubland-26305.herokuapp.com/)

![Photo of App](http://i.imgur.com/simrLpo.png)

### Technologies
- React
- Bootstrap
- Eventable API
- moment
- lodash

### Setup
- fork and clone
- run ```npm install```

In the ```src``` folder, create a ```config.json```. The code in that folder should be...
```
{
"token":"YOUR-EVENTABLE-API-KEY-HERE"
}
```
- ```npm start```

#### Code Sample 

```
renderEvents() {
    let events = this.props.events;
    let { byTitle } = this.props;
    //eventElements are the elements that will be rendered to DOM
    let eventElements = [];
    //eventArr is an array of data for each event
    let eventArr = [];
    //loop through each event to get data for eventArr
      events.forEach((event) => {
        let start = moment(event.start_time).format('LLL');
        let end = moment(event.end_time).format('LLL')
        let timestamp = moment(event.start_time).format('x')
        eventArr.push({'title': event.title, 'start': start, 'end': end, 'url': event.url, 'stamp': timestamp, 'desc': event.description});
      });
      //if searching by title state is true, this will run
      if (byTitle === true) {
        //sort the information by title ascending
        let byTitle = _.sortBy(eventArr, ['title']);
        //loop through to great DOM elements, only if the search bar is empty
        byTitle.forEach((event) => {
          if (this.props.search === "") {
            eventElements.push(
              <Col className="event" key={event.title}>
                <h4><a href={event.url} target="_blank">{event.title}</a></h4>
                <PanelGroup defaultActiveKey="2" accordion>
                  <Panel header="Event Info" eventKey="1"><p>{event.desc}</p></Panel>
                </PanelGroup>
                <span>Start:</span> <p>{event.start}</p>
                <span>End:</span> <p>{event.end}</p>
              </Col>
            )
          }
```

##### Written by Chris Wilkening
