import { pgTable, varchar } from "drizzle-orm/pg-core";
import { movie } from "./movie";
import { country } from "./country";
import { relations } from "drizzle-orm";

export const movieCountry = pgTable("movie_country", {
  movieId: varchar("movie_id",{length:30}).references(() => movie.id,{onDelete: 'cascade'}),  
  countryId: varchar("country_id",{length:30}).references(() => country.id),  
});



export const movieCountryRelations = relations(movieCountry, ({ one }) => ({
  movie: one(movie, {
    fields: [movieCountry.movieId], 
    references: [movie.id], 
  }),
  category: one(country, {
    fields: [movieCountry.countryId], 
    references: [country.id], 
  }),
}));