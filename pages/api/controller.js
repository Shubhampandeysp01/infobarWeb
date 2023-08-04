import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await addDetail(req, res)
  }else if (req.method === 'GET') {
    return await getAllDetails(req, res);
  } else if (req.method === 'PUT') {
    return await updateDetail(req, res);
  } else if (req.method === 'DELETE') {
    return await deleteDetail(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function addDetail(req, res) {
  const body = req.body
  // Validation Checks
  if (body.bhk <= 0) {
    return res.status(400).json({ error: 'BHK must be greater than 0', success: false });
  }

  if (body.price <= 0) {
    return res.status(400).json({ error: 'Price must be greater than 0', success: false });
  }

  if (body.area <= 0) {
    return res.status(400).json({ error: 'Area must be greater than 0', success: false });
  }

  try {
    const newEntry = await prisma.estate.create({
      data: {
        bhk: body.bhk,
        price: body.price,
        area: body.area,
        society: body.society,
        address: body.address,
        floor: body.floor,
        available: body.available
      },
    });

    // Custom API Response for Success
    return res.status(200).json({ ...newEntry, success: true, message: 'Entry created successfully' });
  } catch (error) {
    console.error('Request error', error);
    // Custom API Response for Error
    return res.status(500).json({ error: 'Error creating entry', success: false, errorMessage: error.message });
  }
}

const getAllDetails = async (req, res) => {
  const { id, bhk, price, area, society, address, floor, available } = req.query;
  const where = {};

  // Build the 'where' object dynamically based on the query parameters
  if (id) where.id = parseInt(id); // Include the ID search
  if (bhk) where.bhk = parseInt(bhk);
  if (price) where.price = parseInt(price);
  if (area) where.area = parseInt(area);
  if (society) where.society = { contains: society };
  if (address) where.address = { contains: address };
  if (floor) where.floor = parseInt(floor);
  if (available) where.available = available === 'true';

  try {
    const estates = await prisma.estate.findMany({
      where,
    });

    // Custom API Response for Success
    return res.status(200).json({ estates, success: true, message: 'Fetched estate entries successfully' });
  } catch (error) {
    console.error('Request error', error);
    // Custom API Response for Error
    return res.status(500).json({ error: 'Error fetching estate entries', success: false });
  }
};


async function updateDetail(req, res) {
  const body = req.body;
  const id = parseInt(req.query.id); 

  // Parse other fields as integers
  const bhk = parseInt(body.bhk);
  const price = parseInt(body.price);
  const area = parseInt(body.area);
  const floor = parseInt(body.floor);
  const available = body.available === true;

  // Validation Checks
  if (bhk <= 0) {
    return res.status(400).json({ error: 'BHK must be greater than 0', success: false });
  }

  if (price <= 0) {
    return res.status(400).json({ error: 'Price must be greater than 0', success: false });
  }

  if (area <= 0) {
    return res.status(400).json({ error: 'Area must be greater than 0', success: false });
  }

  try {
    const updatedEntry = await prisma.estate.update({
      where: { id }, // Use the parsed integer value here
      data: {
        bhk, // Use the parsed integer value here
        price, // Use the parsed integer value here
        area, // Use the parsed integer value here
        society: body.society,
        address: body.address,
        floor, // Use the parsed integer value here
        available
      },
    });

    // Custom API Response for Success
    return res.status(200).json({ ...updatedEntry, success: true, message: 'Entry updated successfully' });
  } catch (error) {
    console.error('Request error', error);
    // Custom API Response for Error
    return res.status(500).json({ error: 'Error updating entry', success: false, errorMessage: error.message });
  }
}

async function deleteDetail(req, res) {
  const id = parseInt(req.query.id);

  try {
    // Check if the estate entry exists before attempting to delete it
    const existingEntry = await prisma.estate.findUnique({
      where: { id },
    });

    if (!existingEntry) {
      return res.status(404).json({ error: 'Estate entry not found', success: false });
    }

    // If the estate entry exists, proceed with the deletion
    const deletedEntry = await prisma.estate.delete({
      where: { id },
    });

    // Custom API Response for Success
    return res.status(200).json({ ...deletedEntry, success: true, message: 'Entry deleted successfully' });
  } catch (error) {
    console.error('Request error', error);
    // Custom API Response for Error
    return res.status(500).json({ error: 'Error deleting entry', success: false, errorMessage: error.message });
  }
}

