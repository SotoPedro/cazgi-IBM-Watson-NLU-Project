import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>          
          <table className="table table-bordered">
            <tbody>
            {      
              this.props.emotions.forEach(([key, value]) => {                  
                  <td>{key}  {value}</td>                  

              })        
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
