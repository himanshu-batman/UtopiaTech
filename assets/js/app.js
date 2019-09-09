 (function milestone_1(){
    // Store the url and parameter data
    let url = "http://uat.lightingmanager.in/panel/gettestlist"; // single Http request
    let params = "org_id=4";
    // Fetch the data from url and return promise
    fetch(`${url}?${params}`)
    .then((res)=> res.json())  
    .then((data)=> {
        
        // Show the necessary data in DOM First Task(Mileston-1)
        for(var i in data.result){
            let list = document.getElementById("table-data");
            const row = document.createElement('tr');
            

            row.innerHTML = `
                <td> <a href="#" class="panel-name" id=${i}> ${data.result[i].panel_name}</a></td> 
                <td>${data.result[i].mac_id}</td>
                <td>${data.result[i].Lat}</td>
                <td>${data.result[i].Lng}</td>
                <td> <a href="#" class="map-name"> <i  title=${i} class="fa fa-map-marker"></i> </a> </td>
            `;
  
            list.appendChild(row);

            list.getElementsByClassName("panel-name")[i].addEventListener("click",milestone_2);
            list.getElementsByClassName("map-name")[i].addEventListener("click",milestone_3);

        }

        // Second Task(Mileston-2)
        function milestone_2(){
            // light Box Functionality or Modal
            document.getElementById("light-box").classList.add("light-box");
            document.getElementById("light-box-content").style.display = "block";
            document.getElementById("light-box-content").classList.add("light-box-content");

            document.getElementById("close-light-box").addEventListener('click', closeLightBox); // remove Modal
            //get unique id of element to complete second-task 1,2,3,.. for get result array
            var res = event.target.attributes['id'].value;
        
            let list = document.getElementById("light-box-content");
            const row = document.createElement('table');

            row.innerHTML = `
                <tr>
                    <th>Parameters</th>
                    <th>R Phase</th>
                </tr>
                <tr>
                    <td>Voltage Status </td>
                    <td>${data.result[res].r_volt_status}</td>
                </tr>
                <tr>
                    <td> MCB Status </td>
                    <td>${data.result[res].r_mcb_status}</td>
                </tr>
                <tr>
                    <td> Load Status </td>
                    <td>${data.result[res].r_load_status}</td>
                </tr>
                <tr>
                    <td> PF Status </td>
                    <td>${data.result[res].r_pf_status}</td>
                </tr>
            `
            ;
  
            list.appendChild(row);
            //close Modal function
            function closeLightBox(event){
                event.preventDefault()
                document.getElementById("light-box").classList.remove("light-box");
                document.getElementById("light-box-content").style.display = "none";
                document.getElementById("light-box-content").classList.remove("light-box-content");
                list.removeChild(row);
                 
            }
        }

        function milestone_3(){
            //open map Modal function
            document.getElementById("light-box-map").classList.add("light-box");
            document.getElementById("light-box-map-content").style.display = "block";
            document.getElementById("light-box-map-content").classList.add("light-box-content");

            document.getElementById("close-light-box-map").addEventListener('click', closeLightBox);
            //get unique title of element to complete third-task 1,2,3,.. for get result array
            var res = event.target.attributes['title'].value;
            
            // map box api beacause having issue with google api key 
            mapboxgl.accessToken = 'pk.eyJ1IjoiaGltYW5zaHUtbWF1cnlhIiwiYSI6ImNrMGNxY2pvNzAxdjczY214bW10cGwxaTgifQ.Es9x3xuVECxrWl9oMzsEIg';
            var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [data.result[res].Lng, data.result[res].Lat],
            zoom: 13,
            }
            );

            // create the popup latand long
            var popup = new mapboxgl.Popup({ offset: 25 })
            .setText(` latitude : ${data.result[res].Lat}  longitude : ${data.result[res].Lng}`);
            
            // create DOM element for the marker
            var el = document.createElement('div');
            el.id = 'marker';
            
            // create the marker
            new mapboxgl.Marker(el)
            .setLngLat([data.result[res].Lng, data.result[res].Lat])
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);
            //close map Modal
            function closeLightBox(){
                
                event.preventDefault()
                document.getElementById("light-box-map").classList.remove("light-box");
                document.getElementById("light-box-map-content").style.display = "none";
                document.getElementById("light-box-map-content").classList.remove("light-box-content");
            }

        }

    })
    .catch(error => console.error('Error:', error));
    
    
})() //IFFE to start the app




