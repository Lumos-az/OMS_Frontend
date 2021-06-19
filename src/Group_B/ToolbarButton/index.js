import React from 'react';
import './ToolbarButton.css';

export default function ToolbarButton(props) {
    const { icon, click } = props;
    return (
      <i className={`toolbar-button ${icon}`} onClick={click} />
    );
}