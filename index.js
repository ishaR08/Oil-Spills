const express = require('express');
        const app = express();
        const path = require("path");
        const http = require("http");
        const socketio = require("socket.io");
        const { spawn } = require('child_process');
        const server = http.createServer(app);
        const io = socketio(server);


        document.getElementById('regionSelect').addEventListener('change', function() {
            let selectedRegion = this.value;
            console.log("Region selected:", selectedRegion);
            // Add logic to dynamically update the table based on selected region
        });

        const socket = io();

        socket.on('connect', () => {
        console.log('WebSocket connected');
        });

        socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        });

        socket.on('anomaly-data', function(data) {
            console.log('Received anomaly data:', data);
            updateShip001Data(data);
        });

        function updateShip001Data(data) {
            console.log('Updating ship data with:', data);
            try {
                document.getElementById('ship001Lat').textContent = data.LAT.toFixed(3);
                document.getElementById('ship001Lon').textContent = data.LON.toFixed(3);
                document.getElementById('ship001Cog').textContent = data.COG.toFixed(0);
                document.getElementById('ship001Sog').textContent = data.SOG.toFixed(1);
                document.getElementById('ship001Status').textContent = data.anomaly === -1 ? 'Anomaly' : 'Normal';
                document.getElementById('ship001Anomaly').textContent = data.anomaly === -1 ? 'Yes' : 'No';
                document.getElementById('ship001OilSpill').textContent = data.anomaly === -1 ? 'Suspicious' : 'Clear';
                console.log('Ship data updated successfully');
            } catch (error) {
                console.error('Error updating ship data:', error);
            }
        }