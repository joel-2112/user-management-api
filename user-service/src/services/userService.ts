import { prisma } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const registerUser = async (email: string, name: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

export const getUsers = async () => {
  return await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });
};

export const updateUser = async (id: number, data: { email?: string; name?: string; password?: string }) => {
  const updateData: any = {};
  if (data.email) updateData.email = data.email;
  if (data.name) updateData.name = data.name;
  if (data.password) updateData.password = await bcrypt.hash(data.password, 10);
  return await prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, email: true, name: true, role: true },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};