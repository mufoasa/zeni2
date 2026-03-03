"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { ProductWithSizes } from "@/lib/types";

interface ProductFormProps {
  product?: ProductWithSizes;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    category: product?.category || "men",
    featured: product?.featured || false,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(
    product?.images?.length ? product.images : [""]
  );

  const [sizes, setSizes] = useState<{ size: string; stock: string }[]>(
    product?.product_sizes?.map((s) => ({
      size: s.size,
      stock: s.stock.toString(),
    })) || [
      { size: "28", stock: "10" },
      { size: "30", stock: "10" },
      { size: "32", stock: "10" },
      { size: "34", stock: "10" },
      { size: "36", stock: "10" },
    ]
  );

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function addImageField() {
    setImageUrls([...imageUrls, ""]);
  }

  function removeImageField(index: number) {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  }

  function updateImageUrl(index: number, value: string) {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const images = imageUrls.filter((url) => url.trim() !== "");
      const productData = {
        name: form.name,
        slug: form.slug || generateSlug(form.name),
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        images,
        featured: form.featured,
      };

      if (product) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id);
        if (error) throw error;

        await supabase
          .from("product_sizes")
          .delete()
          .eq("product_id", product.id);

        const sizeData = sizes
          .filter((s) => s.size && s.stock)
          .map((s) => ({
            product_id: product.id,
            size: s.size,
            stock: parseInt(s.stock),
          }));

        if (sizeData.length > 0) {
          const { error: sizeError } = await supabase
            .from("product_sizes")
            .insert(sizeData);
          if (sizeError) throw sizeError;
        }

        toast.success("Product updated");
      } else {
        const { data: newProduct, error } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single();
        if (error) throw error;

        const sizeData = sizes
          .filter((s) => s.size && s.stock)
          .map((s) => ({
            product_id: newProduct.id,
            size: s.size,
            stock: parseInt(s.stock),
          }));

        if (sizeData.length > 0) {
          const { error: sizeError } = await supabase
            .from("product_sizes")
            .insert(sizeData);
          if (sizeError) throw sizeError;
        }

        toast.success("Product created");
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
        {product ? "Edit Product" : "New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl">
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => {
                setForm({
                  ...form,
                  name: e.target.value,
                  slug: generateSlug(e.target.value),
                });
              }}
              className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Slug
            </label>
            <input
              id="slug"
              type="text"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="price"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Price (MKD)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Category
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="new">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Multiple Images */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-sm font-medium text-foreground">
                Images
              </label>
              <button
                type="button"
                onClick={addImageField}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <Plus className="h-3 w-3" />
                Add image
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {imageUrls.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updateImageUrl(i, e.target.value)}
                    placeholder={`Image URL ${i + 1}`}
                    className="flex-1 rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(i)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-destructive transition-colors hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {/* Thumbnail previews */}
            {imageUrls.some((u) => u.trim()) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {imageUrls
                  .filter((u) => u.trim())
                  .map((url, i) => (
                    <div
                      key={i}
                      className="relative h-16 w-16 overflow-hidden rounded-lg border border-border bg-secondary"
                    >
                      <img
                        src={url}
                        alt={`Preview ${i + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Featured product
            </span>
          </label>

          {/* Sizes */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              Sizes & Stock
            </h3>
            <div className="flex flex-col gap-2">
              {sizes.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={s.size}
                    onChange={(e) => {
                      const updated = [...sizes];
                      updated[i].size = e.target.value;
                      setSizes(updated);
                    }}
                    placeholder="Size"
                    className="w-24 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="number"
                    value={s.stock}
                    onChange={(e) => {
                      const updated = [...sizes];
                      updated[i].stock = e.target.value;
                      setSizes(updated);
                    }}
                    placeholder="Stock"
                    className="w-24 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setSizes(sizes.filter((_, j) => j !== i))}
                    className="text-xs text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSizes([...sizes, { size: "", stock: "10" }])}
                className="mt-1 text-xs font-medium text-primary hover:underline"
              >
                + Add size
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : product ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
