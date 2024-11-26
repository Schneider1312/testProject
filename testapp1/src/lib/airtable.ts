import Airtable from 'airtable';

const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
  throw new Error('Missing Airtable credentials. Please check your environment variables.');
}

// Initialize Airtable with the token
const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(AIRTABLE_BASE_ID);

// Table names must match exactly with your Airtable base
const TABLE_NAMES = {
  providers: 'Providers',
  simCards: 'SIM Cards',
  devices: 'Devices',
  customers: 'Customers'
} as const;

type TableName = keyof typeof TABLE_NAMES;

export async function fetchRecords(tableName: TableName) {
  try {
    const records = await base(TABLE_NAMES[tableName])
      .select({
        maxRecords: 100,
        view: 'Grid view'
      })
      .all();

    return records.map(record => ({
      id: record.id,
      ...record.fields
    }));
  } catch (error: any) {
    const message = error?.error?.message || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to fetch ${tableName}: ${message}`);
  }
}

export async function createRecord(tableName: TableName, fields: Record<string, any>) {
  try {
    const records = await base(TABLE_NAMES[tableName]).create([{ fields }]);
    return records[0];
  } catch (error: any) {
    const message = error?.error?.message || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to create ${tableName}: ${message}`);
  }
}

export async function updateRecord(tableName: TableName, recordId: string, fields: Record<string, any>) {
  try {
    const records = await base(TABLE_NAMES[tableName]).update([
      {
        id: recordId,
        fields,
      },
    ]);
    return records[0];
  } catch (error: any) {
    const message = error?.error?.message || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to update ${tableName}: ${message}`);
  }
}

export async function deleteRecord(tableName: TableName, recordId: string) {
  try {
    await base(TABLE_NAMES[tableName]).destroy([recordId]);
  } catch (error: any) {
    const message = error?.error?.message || error?.message || 'Unknown error occurred';
    throw new Error(`Failed to delete ${tableName}: ${message}`);
  }
}