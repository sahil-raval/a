import {
  Sun,
  Wrench,
  Recycle,
  HardHat,
  ClipboardList,
  Zap,
  ShieldCheck,
  Leaf,
  Award,
  Clock,
  Users,
  Layers,
  CheckCircle,
  CheckCircle2,
  MessageSquare,
  Cpu,
  FileCheck,
  Shield,
  PackageCheck,
  HeartHandshake,
  AlertTriangle,
  Phone,
  Mail,
  Globe,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Star,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Sun, Wrench, Recycle, HardHat, ClipboardList, Zap, ShieldCheck, Leaf, Award,
  Clock, Users, Layers, CheckCircle, CheckCircle2, MessageSquare, Cpu, FileCheck,
  Shield, PackageCheck, HeartHandshake, AlertTriangle, Phone, Mail, Globe,
  MapPin, ArrowRight, ArrowUpRight, Facebook, Instagram, Linkedin, Twitter,
  Youtube, Star, Menu, X,
};

export function getIcon(name?: string | null): LucideIcon {
  if (!name) return Sun;
  return map[name] || Sun;
}

export const socialIconMap: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
};
