import { isKeyHotkey } from 'is-hotkey';
import { Change } from 'slate';
import { Plugin } from 'slate-react';

interface Option {
  key: string;
  type: string;
}

export function MarkHotkey(options: Option): Plugin {
  const { key, type } = options;

  return {
    onKeyDown(event: KeyboardEvent, change: Change): any {
      if (!isKeyHotkey(`mod+${key}`, event)) {
        return;
      }
      event.preventDefault();
      change.toggleMark(type);
      return true;
    }
  };
}
