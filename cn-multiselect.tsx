import { Component, EventEmitter, h, Prop, State, Watch, Event, Listen, Element } from '@stencil/core';
export type Option = {
  key: string;
  value: string;
}
@Component({
  tag: 'cn-multiselect',
  styleUrl: 'cn-multiselect.scss',
  shadow: false,
  assetsDirs: ['assets']
})
export class CnMultiselect {
  @Element() el: HTMLElement;

   /** (optional) event on change values */
  @Event() changeValues: EventEmitter<string[]>;

  @State() _options: Option[] = [];

  /** (optional) options */
  @Prop({ mutable: true }) options: Option[] | string;


  @State() _selected: string[];

  /** (optional) selected values */
  @Prop({ mutable: true }) selected: string[] | string;


  /** (optional) placeholder */
  @Prop({reflect: false}) placeholder: string = 'Select option...';
  /** (optional) search's placeholder */
  @Prop({reflect: false}) placeholderSearch: string = 'Search...';
  @State() open: boolean = false;

  /** (optional) disable multiselect */
  @Prop() disabled: boolean = false;
  /** (optional) enable multi values */
  @Prop() multiple: boolean = true;
  /** (optional) enable search */
  @Prop() search: boolean = false;

  searchInput: HTMLInputElement;
  @State() searchKey: string;

  @Watch('options')
  optionsWatcher(newValue: Option[] | string) {

    if (typeof newValue === 'string') {
      this._options = JSON.parse(newValue);
    }
    else {
      this._options = newValue;
    }
  }

  @Watch('selected')
  selectedWatcher(newValue: string[] | string) {

    if (typeof newValue === 'string') {
      this._selected = JSON.parse(newValue);
    }
    else {
      this._selected = newValue;
    }
  }

  //todo
  @Listen('click',{ target: 'window' })
  clickOutsideHandler(ev: any) {

    if (ev.path.some((el) => el === this.el)) {
      return;
    }
    //inserire il codice per chiudere la select
    this.open = false;
  }

  componentWillLoad() {
    this.optionsWatcher(this.options);
    this.selectedWatcher(this.selected);
  }



  render() {

    const selected = this.getSelectedOptions();
    const options = this.getOptions();
    const css_class = this.disabled?"cn-multiselect-wrapper disabled":"cn-multiselect-wrapper";
    const open_options =  this.open?'options open':'options';
    const search = this.search?this.getSearch(): '';
    return (

        <div class={css_class} >
            <div class="cn-selected-options" onClick={() => this.toggleOptions()}>
            {selected}
            </div>
            <div class="container-options">
              <div class={open_options}>
                <div class="content-options">
                  {search}

                  <div class={this.search?'options-list':'options-list no-search'}>
                    {options}
                  </div>
                </div>
              </div>
            </div>

        </div>





    );
  }

  deselected(option: Option, event: any){
    event.stopPropagation();
    const index = this._selected.findIndex( item => item == option.key);
    if( index >= 0){
      this._selected.splice(index,1);
      this._selected = [...this._selected];
    }
    this.changeValues.emit(this._selected);
  }

  private getSelectedOptions() {

    if( this._selected && this._selected.length > 0 && this._options && this._options.length > 0 ){
        return this._selected.map(option=>{
          const selected = this._options.find( item => item.key == option);
          if( selected ){
            return <div class="cn-selected-option">
              <span>{selected.value}</span>
              <span class="cn-btn-delete-option" onClick={event => this.deselected(selected,event)}></span>
            </div>
            }
          }
        )


    }
    return <div class="cn-no-values">{this.placeholder}</div>;
  }

  private getOptions(){
    if( this._options && this._options.length > 0 ){

      const filteredOptions = this._options.map(option=>{
        if( this.search && this.searchKey && this.searchKey.length > 2 && !option.value.toLowerCase().match(new RegExp(this.searchKey.toLowerCase())) ){
            return '';
        }else{
          if( this._selected && this._selected.includes(option.key) ){
            return <div class="cn-option">
              <label class="pure-material-checkbox" >
                <input type="checkbox" checked onChange={event => this.toggle(option,event)}/>
                <span>{option.value}</span>
              </label>
            </div>
          }else{
            return <div class="cn-option">
            <label class="pure-material-checkbox">
              <input type="checkbox" onChange={event => this.toggle(option,event)}/>
              <span>{option.value}</span>
            </label>
          </div>
          }
        }


      })
      return filteredOptions;
    }else{
      return '';
    }

  }

  private getSearch(): HTMLDivElement{
    return <div class="search">
        <span>
          <input placeholder={this.placeholderSearch} ref={(el) => this.searchInput= el as HTMLInputElement} onKeyUp={() => this.searchHandler()}/>
          <div class={(this.searchKey && this.searchKey.length > 0)?'search-delete active':'search-delete'} onClick={() => this.clearSearch()}></div>
        </span>
    </div>
  }

  toggle(option: Option, event: any): void{
    if( !this._selected ) this._selected = [];
    if( !event.target.checked ){
      const index = this._selected.findIndex( item => item == option.key);
      if( index >= 0){
        this._selected.splice(index,1);
        this._selected = [...this._selected];
      }
    }else{
      if( this.multiple ){
        this._selected = [option.key]
      }else{
        this._selected = [...this._selected,option.key]
      }

    }
    this.changeValues.emit(this._selected);
  }


  toggleOptions(): void{
    if( !this.disabled){
      this.open=!this.open
    }
  }

  searchHandler(): void{
    this.searchKey = this.searchInput.value;
  }

  clearSearch(): void{
    this.searchKey = '';
    this.searchInput.value= '';
  }

}
