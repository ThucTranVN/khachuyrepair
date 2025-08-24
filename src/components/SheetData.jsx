import React, { useState, useEffect } from 'react';

const SheetData = ({ sheetId, apiKey, range, onDataLoaded, onLoadingChange, onErrorChange, mode = 'blog' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to clean URLs from text
  const cleanDescription = (text) => {
    if (!text) return '';
    
    // Remove TikTok URLs and other URLs
    const urlPattern = /https?:\/\/[^\s]+/g;
    let cleanedText = text.replace(urlPattern, '');
    
    // Remove extra spaces and clean up
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
    
    // If text is too long, truncate it
    if (cleanedText.length > 150) {
      cleanedText = cleanedText.substring(0, 150) + '...';
    }
    
    return cleanedText;
  };

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Notify parent component about loading state
        if (onLoadingChange) {
          onLoadingChange(true);
        }

        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.values && result.values.length > 0) {
          let formattedData;
          
          if (mode === 'table') {
            // For table mode, return raw data as-is
            formattedData = result.values;
          } else {
            // For blog mode, transform the data
            formattedData = result.values.slice(1).map((row, index) => ({
              id: index,
              date: row[0] || '',
              category: row[1] || 'Technology',
              title: row[2] || '',
              description: cleanDescription(row[3] || ''),
              author: row[4] || 'Khắc Huy',
              authorImage: row[5] || '/tiktok-thumbnail.png',
              image: row[6] || '/tiktok-thumbnail.png',
              url: row[3] || '#'
            }));
          }

          setData(formattedData);
          
          // Notify parent component about data loaded
          if (onDataLoaded) {
            onDataLoaded(formattedData);
          }
        } else {
          setData([]);
        }
      } catch (err) {
        setError(err.message);
        
        // Notify parent component about error
        if (onErrorChange) {
          onErrorChange(err.message);
        }
      } finally {
        setLoading(false);
        
        // Notify parent component about loading state
        if (onLoadingChange) {
          onLoadingChange(false);
        }
      }
    };

    if (sheetId && apiKey && range) {
      fetchSheetData();
    }
  }, [sheetId, apiKey, range, mode]);

  // Return null - this component doesn't render anything
  return null;
};

export default SheetData;
