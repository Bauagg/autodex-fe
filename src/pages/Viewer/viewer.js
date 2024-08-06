/* global Autodesk */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './viewe.css';

async function getAccessToken(callback) {
    try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/token`);
        const { access_token, expires_in } = resp.data;
        console.log('Access Token:', access_token);
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not obtain access token. See the console for more details.');
        console.error(err);
    }
}

const initViewer = (container) => {
    return new Promise((resolve, reject) => {
        Autodesk.Viewing.Initializer({ env: 'AutodeskProduction', getAccessToken }, () => {
            const config = {
                extensions: ['Autodesk.DocumentBrowser']
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start();
            viewer.setTheme('light-theme');
            console.log('Viewer initialized');
            resolve(viewer);
        });
    });
}

const loadModel = (viewer, urn) => {
    return new Promise((resolve, reject) => {
        function onDocumentLoadSuccess(doc) {
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
        }
        function onDocumentLoadFailure(code, message, errors) {
            console.error('Document Load Failure:', { code, message, errors });
            reject({ code, message, errors });
        }
        viewer.setLightPreset(0);
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

const Viewer = ({ selectedUrn }) => {
    const viewerContainer = useRef(null);
    const [viewer, setViewer] = useState(null);

    useEffect(() => {
        initViewer(viewerContainer.current).then(setViewer).catch(console.error);
    }, []);

    useEffect(() => {
        if (viewer && selectedUrn) {
            loadModel(viewer, selectedUrn).then(() => {
                console.log('Model loaded successfully');
            }).catch(console.error);
        }
    }, [viewer, selectedUrn]);

    return (
        <div className="viewer-wrapper">
            <div ref={viewerContainer} className='viewer-container'></div>
        </div>
    );
}

export default Viewer;
