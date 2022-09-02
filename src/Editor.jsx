import React, { useState, useEffect } from 'react';
import grapesjs from "grapesjs";
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import './styles/main.scss'
import { useParams } from 'react-router-dom';

const Editor = () => {
  const [editor, setEditor] = useState(null)
  const { page_id } = useParams()

  const baseUrl = 'https://server-web-builder.netlify.app/.netlify/functions/server/ui/'

  useEffect(() => {
    loadGrapesjs()
  }, [])

  const loadGrapesjs = () => {
    const link = {
      urlLoad: `${baseUrl}render/${page_id}`,
      urlStore: `${baseUrl}edit/${page_id}`
    }

    const editor = grapesjs.init({
      container: '#editor',
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        gjsBlocksBasic: {}
      },
      storageManager: {
        type: 'remote',
        stepsBeforeSave: 1,
        params: {
          'Access-Control-Allow-Origin': 'http://localhost:5000',
        },
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        options: {
          remote: {
            headers: {
              'Content-Type': 'application/json'
            },
            urlLoad: `${link.urlLoad}`,
            urlStore: `${link.urlStore}`,
            fetchOptions: opts => (opts.method === 'POST' ? { method: 'PUT' } : {}),
            credentials: 'omit',
            onStore: data => ({ data }),
            onLoad: result => result.data,
            contentTypeJson: true,
          }
        }
      },
    });
    if (editor) {
      setEditor(editor)
    }
  }
  return (
    <div className="app-wrap">
      <div class="editor-wrap">
        <div id="editor"></div>
      </div>
    </div>
  )
}


export default Editor