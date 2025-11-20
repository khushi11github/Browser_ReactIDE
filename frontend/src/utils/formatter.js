// Code formatting utilities
import prettier from 'prettier/standalone';
import prettierBabel from 'prettier/plugins/babel';
import prettierEstree from 'prettier/plugins/estree';
import prettierCSS from 'prettier/plugins/postcss';
import prettierHTML from 'prettier/plugins/html';

export async function formatCode(code, language) {
  try {
    let parser;
    let plugins = [];

    switch (language) {
      case 'javascript':
      case 'jsx':
        parser = 'babel';
        plugins = [prettierBabel, prettierEstree];
        break;
      case 'typescript':
      case 'tsx':
        parser = 'typescript';
        plugins = [prettierBabel, prettierEstree];
        break;
      case 'css':
        parser = 'css';
        plugins = [prettierCSS];
        break;
      case 'html':
        parser = 'html';
        plugins = [prettierHTML];
        break;
      case 'json':
        parser = 'json';
        plugins = [prettierBabel, prettierEstree];
        break;
      default:
        return code; // Return as-is for unsupported languages
    }

    const formatted = await prettier.format(code, {
      parser,
      plugins,
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      printWidth: 80,
      arrowParens: 'avoid',
    });

    return formatted;
  } catch (error) {
    console.error('Formatting error:', error);
    throw new Error(`Failed to format code: ${error.message}`);
  }
}

export function canFormat(language) {
  return ['javascript', 'jsx', 'typescript', 'tsx', 'css', 'html', 'json'].includes(language);
}
