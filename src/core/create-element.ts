export function createElement({
  name,
  props = {},
  children = [],
  events = [],
}: ICreateElement) {
  const element = document.createElement(name);

  const focus = props.focus;
  if (props.focus) {
    delete props.focus;
  }

  if (focus) {
    setTimeout(() => {
      element.focus();
    }, 0);
  }

  Object.assign(element.style, props.style);
  delete props.style;
  Object.assign(element, props);

  for (const child of children) {
    if (typeof child === 'boolean') continue;
    element.append(child);
  }

  for (const event of events) {
    element.addEventListener(event.type, event.callback);
  }

  return element;
}

interface ICreateElement {
  name: TElementName;
  props?: IElementProp;
  children?: (HTMLElement | boolean)[];
  events?: IEvent[];
}

type TElementName =
  | 'button'
  | 'div'
  | 'img'
  | 'h1'
  | 'header'
  | 'input'
  | 'footer'
  | 'form'
  | 'li'
  | 'main'
  | 'nav'
  | 'section'
  | 'span'
  | 'ul';

interface IElementProp {
  className?: string;
  textContent?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'submit';
  value?: string;
  style?: IStyle;
  disabled?: boolean;
  src?: string;
  focus?: boolean;
}

interface IStyle {
  borderLeft: string;
}

interface IEvent {
  type: 'click' | 'input' | 'submit' | 'change';
  callback: (e: Event | InputEvent) => void;
}
