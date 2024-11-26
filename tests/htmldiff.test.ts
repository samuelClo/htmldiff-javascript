import Diff from '../src/lib/Diff'
import { describe, test, expect } from 'vitest'

describe('Basic use', () => {
	test('returns an empty string when both inputs are empty', () => {
		const oldText = ''
		const newText = ''
		const result = Diff.execute(oldText, newText)
		expect(result).toBe('')
	})

	test('Return same text when both inputs are the same', () => {
		const oldText = /*html*/ `
      <p>
        En 2015, Daniel Lafargue auteur de
        <em>La face cachée de l’ennéagramme</em> estime « il s’est déjà
        beaucoup infiltré, notamment, dans le milieu du développement
        personnel, le conseil en entreprise ou même l’Éducation nationale !
        ».
      </p>`
		const newText = /*html*/ `
      <p>
        En 2015, Daniel Lafargue auteur de
        <em>La face cachée de l’ennéagramme</em> estime « il s’est déjà
        beaucoup infiltré, notamment, dans le milieu du développement
        personnel, le conseil en entreprise ou même l’Éducation nationale !
        ».
      </p>`
		const result = Diff.execute(oldText, newText)
		expect(result).toBe(/*html*/ `
      <p>
        En 2015, Daniel Lafargue auteur de
        <em>La face cachée de l’ennéagramme</em> estime « il s’est déjà
        beaucoup infiltré, notamment, dans le milieu du développement
        personnel, le conseil en entreprise ou même l’Éducation nationale !
        ».
      </p>`)
	})

	test('Return the new text when the old text is empty', () => {
		const oldText = '<span></span>'
		const newText = '<span>Hello World</span>'
		const result = Diff.execute(oldText, newText)
		expect(result).toBe('<span><ins class="diffins">Hello World</ins></span>')
	})

	test('Return the old text when the new text is empty', () => {
		const oldText = '<span>Hello World</span>'
		const newText = ''
		const result = Diff.execute(oldText, newText)
		expect(result).toBe('<span><del class="diffdel">Hello World</del></span>')
	})

	test('detects a single word addition', () => {
		const oldText = '<span>Hello</span>'
		const newText = '<span>Hello World</span>'
		const result = Diff.execute(oldText, newText)
		expect(result).toBe('<span>Hello<ins class="diffins">&nbsp;World</ins></span>')
	})

	test('detects a single word deletion', () => {
		const oldText = '<span>Hello World</span>'
		const newText = '<span>Hello</span>'
		const result = Diff.execute(oldText, newText)
		expect(result).toBe('<span>Hello<del class="diffdel">&nbsp;World</del></span>')
	})

	test('detects a word modification', () => {
		const oldText = '<span>Hello World</span>'
		const newText = '<span>Hello Everyone</span>'
		const result = Diff.execute(oldText, newText)
		expect(result).toBe('<span>Hello <del class="diffmod">World</del><ins class="diffmod">Everyone</ins></span>')
	})

	test('detects multiple changes', () => {
		const oldText = '<span>The quick brown fox</span>'
		const newText = '<span>The quick red fox jumps</span>'
		const result = Diff.execute(oldText, newText)
		expect(result).toBe(
			/*html*/ `<span>The quick <del class="diffmod">brown</del><ins class="diffmod">red</ins> fox<ins class="diffins">&nbsp;jumps</ins></span>`,
		)
	})

	test('handles complex HTML input', () => {
		const oldText = '<p>Hello <b>World</b></p>'
		const newText = '<p>Hello <i>Universe</i></p>'
		const result = Diff.execute(oldText, newText)
		expect(result).toBe(
			/*html*/ `<p>Hello <b><ins class="mod"><del class="diffmod">World</del></ins><i><ins class="mod"><ins class="diffmod">Universe</ins></ins></i></p>`,
		)
	})
})

describe('Handle empty line', () => {
	test('Detect new empty line added at the beginning of the document')
	test('Detect new line added at the middle of a list')
	test('Detect new line added at the middle of the document')
	// No need because we trim empty line at the end of the file
	test.skip('Detect new empty line added at the end of the file')
})

describe('Handle white space', () => {
	test('Detect white space at the beginning of the document')
	test('Detect white space at the beginning of a phrase')
	test('Detect white space at the middle of a phrase')
	test('Detect white space at the end of a phrase')
})

describe('Handle link', () => {
	test('Detect change in href link')
	test('Detect change in text link')
})

describe('Test bold text change', () => {
	test('Detect changed text to bold')
	test('Detect changed text to bold with different content')
})
