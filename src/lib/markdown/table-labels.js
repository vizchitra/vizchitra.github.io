import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to inject data-label attributes into table cells
 * for responsive card/stack layouts on mobile.
 *
 * Extracts text from <th> elements and adds corresponding data-label
 * attributes to <td> elements in the same column position.
 */

// ============================================
// Helper Functions
// ============================================

/**
 * Extracts text content from a node and its children
 */
function getTextContent(node) {
	if (!node) return '';

	if (node.type === 'text') {
		return node.value;
	}

	if (node.children) {
		return node.children.map(getTextContent).join('');
	}

	return '';
}

/**
 * Finds the thead element in a table node
 */
function findTableHead(tableNode) {
	if (!tableNode.children) return null;

	return tableNode.children.find((child) => child.type === 'element' && child.tagName === 'thead');
}

/**
 * Finds the tbody element in a table node
 */
function findTableBody(tableNode) {
	if (!tableNode.children) return null;

	return tableNode.children.find((child) => child.type === 'element' && child.tagName === 'tbody');
}

/**
 * Extracts header labels from thead > tr > th elements
 * Returns an array of label strings, one per column
 */
function extractHeaderLabels(theadNode) {
	if (!theadNode || !theadNode.children) return [];

	// Find the first <tr> in thead
	const headerRow = theadNode.children.find(
		(child) => child.type === 'element' && child.tagName === 'tr'
	);

	if (!headerRow || !headerRow.children) return [];

	// Extract text from each <th>
	const headers = headerRow.children
		.filter((child) => child.type === 'element' && child.tagName === 'th')
		.map((th) => getTextContent(th).trim());

	return headers;
}

/**
 * Adds data-label attributes to all <td> elements in tbody
 * based on their column index
 */
function addLabelsToDataCells(tbodyNode, labels) {
	if (!tbodyNode || !tbodyNode.children || labels.length === 0) return;

	// Visit each row in tbody
	tbodyNode.children.forEach((row) => {
		if (row.type !== 'element' || row.tagName !== 'tr') return;
		if (!row.children) return;

		// For each <td> in the row, add data-label based on column index
		let columnIndex = 0;
		row.children.forEach((cell) => {
			if (cell.type !== 'element' || cell.tagName !== 'td') return;

			// Add data-label attribute if we have a label for this column
			if (columnIndex < labels.length) {
				cell.properties = cell.properties || {};
				cell.properties.dataLabel = labels[columnIndex];
			}

			columnIndex++;
		});
	});
}

// ============================================
// Plugin Export
// ============================================

/**
 * Rehype plugin that adds data-label attributes to table cells
 * for responsive mobile card layouts
 */
export function rehypeTableLabels() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			// Only process <table> elements
			if (node.tagName !== 'table') return;

			// Extract header labels from thead
			const thead = findTableHead(node);
			const labels = extractHeaderLabels(thead);

			// Skip if no headers found
			if (labels.length === 0) return;

			// Add data-label attributes to tbody cells
			const tbody = findTableBody(node);
			if (tbody) {
				addLabelsToDataCells(tbody, labels);
			}
		});
	};
}
