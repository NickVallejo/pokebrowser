import React, {Fragment, createRef, useRef, useEffect} from 'react';

function TapValues({tapValue}) {
    let valRefs = useRef([createRef(), createRef(), createRef()])

    useEffect(() => {
        valRefs.current.forEach((ref, i) => {
          if(ref.current !== null) {
            setTimeout(() => {
              ref.current.className = `tap-value tap-value__${tapValue[i]} tap-value__fly`
            }, 1)
          }
        }) 
    }, [tapValue])

    return (
        <Fragment>
            {tapValue && tapValue.map((val, i) => (
            <h3 key={`tapVal-${i}`} ref={valRefs.current[i]} className="tap-value">{val}</h3>
            ))}
        </Fragment>
    )
}

export default TapValues;
