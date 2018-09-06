import * as React from 'react';
import { CUSTOM_STYLE, ToolType } from './constant';

const blockRule = {
  deserialize(el: any, next: (elements: any) => any): any {
    if (el.nodeType === Node.ELEMENT_NODE) {
      const type = el.dataset.nodeType;
      if (type) {
        const config = { object: 'block', type };
        switch (type) {
          case ToolType.Line:
            return { ...config, isVoid: true };
          case ToolType.Image:
            return {
              ...config,
              isVoid: true,
              data: {
                src: el.src
              }
            };
          default:
            return {
              ...config,
              nodes: next(el.childNodes)
            };
        }
      }
    }
  },
  serialize(obj: any, children: string): any {
    if (obj.object === 'block') {
      switch (obj.type) {
        case 'paragraph':
          return <p data-node-type="paragraph">{children}</p>;
        case 'subtitle':
          return (
            <h3 style={CUSTOM_STYLE.subtitle} data-node-type="subtitle">
              {children}
            </h3>
          );
        case 'comment':
          return (
            <p style={CUSTOM_STYLE.comment} data-node-type="comment">
              {children}
            </p>
          );
        case 'blockquote':
          return (
            <blockquote
              style={CUSTOM_STYLE.blockquote}
              data-node-type="blockquote"
            >
              {children}
            </blockquote>
          );
        case 'line':
          return <hr style={CUSTOM_STYLE.line} data-node-type="line" />;
        case 'image':
          return (
            <img
              style={CUSTOM_STYLE.image}
              src={obj.data.get('src')}
              alt="img"
              data-node-type="image"
            />
          );
        default:
          return null;
      }
    }
  }
};

const markRule = {
  deserialize(el: any, next: (elements: any) => any): any {
    if (el.nodeType === Node.ELEMENT_NODE) {
      const type = el.dataset.markType;
      if (type) {
        return {
          type,
          object: 'mark',
          nodes: next(el.childNodes)
        };
      }
    }
  },
  serialize(obj: any, children: string): any {
    if (obj.object === 'mark') {
      switch (obj.type) {
        case 'bold':
          return <strong data-mark-type="bold">{children}</strong>;
        case 'strong':
          return (
            <strong style={CUSTOM_STYLE.strong} data-mark-type="strong">
              {children}
            </strong>
          );
        case 'italic':
          return <em data-mark-type="italic">{children}</em>;
        case 'underline':
          return <u data-mark-type="underline">{children}</u>;
        case 'strikethrough':
          return <del data-mark-type="strikethrough">{children}</del>;
        case 'tag':
          return (
            <span style={CUSTOM_STYLE.tag} data-mark-type="tag">
              {children}
            </span>
          );
        default:
          return null;
      }
    }
  }
};

const rules = [blockRule, markRule];

export default rules;
