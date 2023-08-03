export class FunnelElement extends HTMLElement {
    #default = {};
    
    constructor(props={}){
        super()
        this.state = this.initState(props);  

    }

    initState(defValues, props){
        let state = Object.assign({}, defValues, props);
        if (defValues!=undefined){
            if (Object.keys(defValues).lenght!=0){
                Object.keys(defValues).forEach(prop=>{  
                    if (props[prop]!=undefined){
                        if (typeof props[prop] === 'string' ||  Array.isArray(props[prop])){
                            state[prop] = props[prop];
                        }else{
                            state[prop] = Object.assign({}, defValues[prop], props[prop]);
                        }
                        
                    }  
                })
            }
        }
        return state;
    }

    attribute2CamelCase(attribute) {
        const pattern = new RegExp(("-" + "([a-z])"), "g");
        return attribute.replace(pattern, (match, capture) => capture.toUpperCase());
      }
    
    camelCase2attribute(camelCase) {
        return camelCase.replace(new RegExp('-([a-z])', 'g'), (m, c) => c.toUpperCase());
      }

    setState(props){
        this.state =this.initState(this.#default,props);
        this.render();
    }

    updateState(props){
        this.state = this.initState(this.state, props)
        this.render();
    }


    setAnimation(props){
        if (props===undefined||props===null){
            return '';
        }else{
            let animation = ` data-animation=${props.animation}`
            props.delay!=undefined?animation+= ` data-delay=${props.delay}`:false;
            props.speed!=undefined?animation+=` data-speed=${props.speed}`:false;
            props.repeat!=undefined?animation+=` data-repeat=${props.repeat}`:false;
            return animation
        } 
        
    }

    cleanValue(prop){
        return prop!=undefined?prop:'';
    }

    updateClassList(){
        if (this.state.classList){
            this.classList.add(...this.state.classList)
          }
    }

    getClasses(defaultClass=[], optionalClasses){
        let resultClasses = [];
        if (optionalClasses===undefined){
            resultClasses = defaultClass
        }else{
            resultClasses = [...defaultClass, ...optionalClasses]
        }
        let classes = '';
        if (resultClasses.length>0){
            classes = `class="${resultClasses.toString().replaceAll(",", " ")}"`;
        }
        return classes;
    }

    

    #getButtons(props){
        if(props!=undefined){
            console.log(props)
            let buttons = '';
            Object.entries(props).forEach(([key, value])=>{                
                let button = ['button']; 
                if (props[key]['classList']!= undefined){
                    button = [...new Set([...button, ...props[key]['classList']])];
                }
                let buttonClass = button.toString().replaceAll(",", " ");
                buttons += `<button id=${key} class="${buttonClass}" ${this.setAnimation(props[key]['animation'])}>
                    ${props[key]['text'][this.state.context.lang]}
                </button>`;
            });
            return buttons;
        }else return ''
    }
   
    buttonsRender(props){
        let buttons = ['buttons'];
        if (props.classList!= undefined){
            buttons = [...new Set([...buttons, ...props.classList])];
        }
       let buttonClass = buttons.toString().replaceAll(",", " ")
        if(props!=undefined){
            console.log('Props', props)
            let buttons = /* html */`
                <p class="${buttonClass}">
                    ${this.#getButtons(props.buttons)}
                </p>
            `
           return buttons;
        }else return '';
    }




    render(){
        console.error('Nothing to render');
    }

    connectedCallback(){
        this.render();
    }  

}

customElements.define("funnel-element", FunnelElement)
